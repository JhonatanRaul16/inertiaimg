<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TopicController extends Controller
{
    public function index(Request $request)
    {
        $topic = Topic::when($request->input('search'), function($query,$search){
            $query->where('name','LIKE',"%{$search}");
        })->paginate(3);
        return Inertia::render('Topics/Index',[
            'topics' => $topic
        ]);
    }

    public function create()
    {
        return Inertia::render('Topics/Create');
    }

    public function store(Request $request)
    {
        $image = $request->file('image')->store('topics','public');
        Topic::create([
            'name'=> $request->input('name'),
            'image'=> $image
        ]);

        return Redirect::route('topics.index');
    }

    public function edit(Topic $topic)
    {   
        return Inertia::render('Topics/Edit',[
            'topic' => $topic,
            'image' => asset('storage/'. $topic->image),
        ]);
    }

    public function update(Request $request,Topic $topic)
    {
        $image = $topic->image;
        if($request->file('image')){
            Storage::delete('public/' . $topic->image);
            $image = $request->file('image')->store('topics','public');
        }
        $topic->update([
            'name' => $request->input('name'),
            'image' => $image
        ]);
        return Redirect::route('topics.index');
    }
}
