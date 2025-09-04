<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class ParticipantController extends Controller
{
    //
    public function setPhoto(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif',
            "id" => "required"
        ]);

        $profile = Participant::find($request->id);

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $filePath = $file->store('images/participants', 'public');

            $oldFilePath = storage_path('app/public/images/participants/' . $profile->image);

            if ($profile->image) {
                unlink($oldFilePath);
            }

            $profile->image = basename($filePath);
            $profile->save();

            return response()->json([
                'message' => 'Photo uploaded successfully!',
                'profile' => $profile,
            ]);
        }

        return response()->json(['message' => "Error"], 400);
    }
    public function runQueue()
    {
        Artisan::call('queue:work --stop-when-empty');
        return response()->json([
            'message' => 'Queue started in background!'
        ]);
    }

    public function storeProgress(Request $request, int $participant)
    {
        $data = $request->validate([
            'level' => 'required|integer|min:1',
            'time_ms' => 'required|integer|min:0',
            'attempts' => 'required|integer|min:1',
            'score' => 'required|integer|min:0',
        ]);

        $payload = json_encode([
            'level' => $data['level'],
            'time_ms' => $data['time_ms'],
            'attempts' => $data['attempts'],
            'score' => $data['score'],
            'played_at' => gmdate('c'),
        ], JSON_THROW_ON_ERROR);

        DB::update(
            'UPDATE participants
             SET game_progress_data = JSON_ARRAYAPPEND(
               COALESCE(game_progress_data, JSON_ARRAY()),
               "$",
               CAST(? AS JSON)
             )
             WHERE id = ?',
            [$payload, $participant]
        );

        return response()->json(['success' => true]);
    }
}
