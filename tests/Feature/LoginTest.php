<?php

namespace Tests\Unit;

use App\Models\User;
use Tests\TestCase;

class LoginTest extends TestCase
{
    /**
     * Tests the login Sequence.
     *
     * @return void
     */
    public function test_login()
    {
        $user = User::factory()->make();
        $this
            ->actingAs($user)
            ->get('/login');
        $this->assertAuthenticatedAs($user);
    }
}
