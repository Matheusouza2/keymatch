<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <link rel="manifest" href="/manifest.json" />

            <script>
                navigator.serviceWorker.register("/pwabuilder-adv-sw.js")
            </script>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Styles / Scripts -->
        @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
            @viteReactRefresh
            @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        @endif
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
