<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FileController extends Controller
{
    public function index()
    {
        $files = Storage::files('uploads');

        $fileNames = array_map('basename', $files);

        Inertia::share('files', $fileNames);

        return Inertia::render('Home');
    }

    public function upload(Request $request)
    {
        
        $request->validate([
            'file' => 'required|mimes:pdf,doc,docx|max:2048',
        ]);

        
        $file = $request->file('file');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $file->storeAs('uploads', $fileName);

        return response()->json(['message' => 'File uploaded successfully']);
    }

    public function download($fileName)
    {
        $filePath = storage_path('app/uploads/' . $fileName);

        if (file_exists($filePath)) {
            return response()->download($filePath);
        } else {
            return response()->json(['error' => 'File not found'], 404);
        }
    }

    public function delete($fileName)
    {
        $filePath = storage_path('app/uploads/' . $fileName);

        if (file_exists($filePath)) {
            Storage::delete('uploads/' . $fileName);
            return response()->json(['message' => 'File deleted successfully']);
        } else {
            return response()->json(['error' => 'File not found'], 404);
        }
    }

    public function getFiles()
    {
        $files = Storage::files('uploads');
        $fileNames = array_map('basename', $files);

        return response()->json(['files' => $fileNames]);
    }
}