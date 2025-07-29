<?php

namespace App\Events;

use App\Models\Kelas;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CreateKelas implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public $kelas;
    public function __construct(Kelas $kelas)
     {
        $this->kelas = $kelas;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('kelas'),
        ];
    }
    
    public function broadcastAs()
    {
        return 'CreateKelas';
    }
    public function broadcastWith()
{
    return [
        'kelas' => $this->kelas->load('kelas') // Load relasi jika diperlukan
    ];
}
}
