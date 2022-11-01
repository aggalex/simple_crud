<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use function Psy\debug;

function isAssoc(array $arr): bool {
    if (array() === $arr) return false;
    return array_keys($arr) !== range(0, count($arr) - 1);
}


class TaskController extends Controller
{
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

        $tasks = $request->all();

        if (isAssoc($tasks)) {
            $tasks = [$tasks];
        }

        $tasks = collect($tasks)
            ->map(fn (array $task) => [
                ...$task,
                'user_id' => $id
            ]);

        return Task::factory()
            ->count($tasks->count())
            ->state(new Sequence(...$tasks))
            ->create();
    }

    public function update(Request $request) {
        $id = Auth::id();

        $tasks = $request->all();

        $forbidden = self::forbidden_ids($id, array_keys($tasks));
        if (!$forbidden->isEmpty()) {
            return response()->json([
                'message' => 'Forbidden attempt to alter tasks not owned by the user',
                'forbidden_ids' => $forbidden
            ], 403);
        }

        $count = 0;

        foreach ($tasks as $taskId => $name) {
            $count += Task::find($taskId)
                ->update(['name' => $name]);
        }

        return response()->json(['affected_rows' => $count], 200);
    }

    public function delete(Request $request) {
        $id = Auth::id();

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
