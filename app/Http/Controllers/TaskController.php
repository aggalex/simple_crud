<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Nette\Schema\ValidationException;
use function Psy\debug;

function isAssoc(array $arr): bool {
    if (array() === $arr) return false;
    return array_keys($arr) !== range(0, count($arr) - 1);
}


class TaskController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    private static function forbidden_ids(int|null|string $id, array $tasks): Collection {
        return Task::findMany($tasks)
            ->reject(fn($task) => $task['user_id'] === $id);
    }

    public function read(Request $request) {
        $id = Auth::id();

        return Task::where('user_id', '=', $id)->get();
    }

    public function create(Request $request) {
        $id = Auth::id();

        try {
            $request->validate([
                '*' => 'string'
            ]);
        } catch (ValidationException $exception) {
            response()->json([
                'message' => 'Bad content format',
                'details' => $exception->getMessage(),
                'suggestion' => 'Expected string[]'
            ], 400);
        }

        $tasks = $request->all();

        if (isAssoc($tasks)) {
            $tasks = [$tasks];
        }

        $tasks = collect($tasks)
            ->map(fn (string $name) => [
                'name' => $name,
                'user_id' => $id
            ]);

        $tasks = Task::factory()
            ->count($tasks->count())
            ->state(new Sequence(...$tasks))
            ->create();

        error_log(json_encode($tasks));

        return $tasks;
    }

    public function update(Request $request) {
        $id = Auth::id();

        try {
            $request->validate([
                '*.id' => 'integer|required',
                '*.name' => 'string|required',
            ]);
        } catch (ValidationException $exception) {
            response()->json([
                'message' => 'Bad content format',
                'details' => $exception->getMessage(),
                'suggestion' => 'Expected { "id": number, "name": string }[]'
            ], 400);
        }

        $tasks = $request->all();

        $taskIds = collect($tasks)
            ->map(fn (array $task) => $task['id'])
            ->toArray();

        $forbidden = self::forbidden_ids($id, $taskIds);
        if (!$forbidden->isEmpty()) {
            return response()->json([
                'message' => 'Forbidden attempt to alter tasks not owned by the user',
                'forbidden_ids' => $forbidden
            ], 403);
        }

        $count = 0;

        foreach ($tasks as $taskUpdate) {
            $taskId = $taskUpdate['id'];
            $name = $taskUpdate['name'];
            error_log("updating ".$taskId." to ".$name);
            $count += Task::find($taskId)
                ->update(['name' => $name]);
        }

        $newTasks = Task::findMany($taskIds);

        error_log("updated tasks: ".json_encode($newTasks));

        return response()->json($newTasks, 200);
    }

    public function delete(Request $request) {
        $id = Auth::id();

        $request->validate([
            '*' => 'integer'
        ]);

        $tasks = $request->all();

        $forbidden = self::forbidden_ids($id, $tasks);
        if (!$forbidden->isEmpty()) {
            return response()->json([
                'message' => 'Forbidden attempt to alter tasks not owned by the user',
                'forbidden_ids' => $forbidden
            ], 403);
        }

        foreach ($tasks as $task) {
            Task::find($task)->delete();
        }

        return response()->json(['affected_rows' => count($tasks)], 200);
    }
}
