<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\TestResponse;
use Tests\TestCase;
use function Psy\debug;

class TaskTest extends TestCase
{
    public function assertTasks(TestResponse $response, string ...$tasks) {
        foreach ($tasks as $task) {
            $response->assertJsonFragment([
                'name' => $task
            ]);
        }
    }

    /**
     * Tests the crud operations.
     *
     * @return void
     */
    public function test_crud()
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('/tasks', [
                [
                    'name' => 'hello world'
                ],
                [
                    'name' => 'goodbye world'
                ]
            ])
            ->assertOk();

        $response = $this->actingAs($user)
            ->get('/tasks');
        $this->assertTasks($response, 'hello world', 'goodbye world');

        $tasks = $response->json();
        $updated_tasks = [];
        foreach ($tasks as $task) {
            $updated_tasks[$task['id']] = $task['name']." of php";
        }
        $this->actingAs($user)
            ->patch('/tasks', $updated_tasks)
            ->assertOk();

        $response = $this->actingAs($user)
            ->get('/tasks');
        $this->assertTasks($response, 'hello world of php', 'goodbye world of php');

        $this->actingAs($user)
            ->delete('/tasks', array_keys($updated_tasks))
            ->assertOk();

        $user->delete();
    }

    function test_forbidden_update_and_delete() {
        $owner = User::factory()->create();

        $perpetrator = User::factory()->create();

        $this->actingAs($owner)
            ->post('/tasks', ['name' => 'hello world'])
            ->assertOk();

        $tasks = $this->actingAs($owner)
            ->get('/tasks');
        $this->assertTasks($tasks, 'hello world');

        $task = $tasks[0];

        $this->actingAs($perpetrator)
            ->patch('/tasks', [$task['id'] => 'bad, evil things'])
            ->assertForbidden();

        // If I can't have it, nobody can! MUAHAHAHA
        $this->actingAs($perpetrator)
            ->delete('/tasks', [$task['id']])
            ->assertForbidden();

        // Total defeat
        $perpetrator->delete();

        $owner->delete();
    }
}
