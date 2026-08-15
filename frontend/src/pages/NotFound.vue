<template>
<div class="h-screen bg-gray-200 ">
  <div class="min-h-full flex items-center justify-center">
    <div class="text-center">
      <!-- 404 Illustration -->
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-blue-600">404</h1>
        <div class="relative inline-block mt-4">
          <svg class="w-64 h-48 text-gray-300" viewBox="0 0 200 150" fill="none" stroke="currentColor" stroke-width="1.5">
            <!-- Simple illustration of a confused person -->
            <circle cx="100" cy="50" r="30" class="text-gray-400"/>
            <path d="M85 45 Q90 40 95 45" class="text-gray-500"/>
            <path d="M105 45 Q110 40 115 45" class="text-gray-500"/>
            <path d="M90 60 Q100 55 110 60" class="text-gray-500"/>
            <path d="M70 80 Q100 100 130 80" class="text-gray-400"/>
            <path d="M80 80 L80 130" class="text-gray-400"/>
            <path d="M120 80 L120 130" class="text-gray-400"/>
            <path d="M80 130 L70 145" class="text-gray-400"/>
            <path d="M80 130 L90 145" class="text-gray-400"/>
            <path d="M120 130 L110 145" class="text-gray-400"/>
            <path d="M120 130 L130 145" class="text-gray-400"/>
            <!-- Question marks -->
            <text x="50" y="30" class="text-gray-400 text-2xl">?</text>
            <text x="140" y="40" class="text-gray-400 text-3xl">?</text>
            <text x="160" y="20" class="text-gray-400 text-xl">?</text>
          </svg>
        </div>
      </div>

      <!-- Error Message -->
      <h2 class="text-3xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h2>
      <p class="text-gray-600 mb-8 max-w-md mx-auto">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

     
      <!-- Action Buttons -->
      <div class="flex flex-wrap justify-center gap-4">
        <RouterLink to="/admin" class="btn btn-primary btn-lg">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          Go Home
        </RouterLink>
        <!-- <button onclick="history.back()" class="btn btn-outline-secondary btn-lg">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Go Back
        </button> -->
      </div>


      <!-- Footer -->
      <p class="text-gray-400 text-sm mt-12">
        &copy; 2026 Admin panel. All rights reserved.
      </p>
    </div>
  </div>
</div>
</template>