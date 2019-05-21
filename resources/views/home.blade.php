<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ asset(mix('css/mix/app.css')) }}" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
<div id="root"></div>
<script>
    const page_data = {
        isAuthenticated: '{!! auth()->check() !!}' === '1',
        user: JSON.parse('{!! auth()->check()?(json_encode(auth()->user()->only(['id','name','email']))):'{}' !!}')
    }
</script>
<script src="{{ asset(mix('js/mix/app.js')) }}" defer></script>
</body>
</html>
