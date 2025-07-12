@extends('layouts.app')

@section('title', 'Home')

@section('content')
<section>
<div class="absolute top-0 left-0 w-full h-150 -z-10 mt-0 overflow-hidden rounded-bl-[50px] rounded-br-[50px]">
    <video autoplay loop muted playsinline class="w-full h-150 object-cover">
        <source src="{{ asset('storage/video/videobg.mp4') }}" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>
<div class="pt-10 mr-50 ml-50 mt-50">
    <h2 class="text-5xl font-black mb-4 text-white">Perjalanan Menghasilkan Kebahagiaan</h2>
    <p class="text-white">Temukan keindahan Sabang dan You will love every corner of it</p>
    <button class="mt-4 bg-amber-400 text-black px-6 py-2 rounded-lg hover:bg-amber-500 transition font-extrabold">
        <a href="/destinasi">Cari Destinasi</a>
    </button>
</div>
</section>

<!-- Welcome Section -->
<section class="py-16 mr-50 ml-50 mt-25">
    <div class="container mx-auto px-6 flex flex-col lg:flex-row  items-stretch ">
        <!-- Image Section -->
        <div class="lg:w-1/2 mb-10 lg:mb-0 mt-10">
            <iframe class="rounded-l-xl shadow-lg h-80 object-cover w-full border-y-2 border-l-2" width="560" height="315" src="https://www.youtube.com/embed/Lp8OFLD1l8g?si=hZlYcxs7cluSOY_d" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

        </div>
        <!-- Text Section -->
        <div class="lg:w-1/2 lg:pl-5 bg-gray-900 text-white p-5 rounded-xl flex flex-col justify-between">
            <div>
                <h2 class="text-3xl font-black mb-6 text-amber-400 uppercase">Selamat Datang di Sabang!</h2>
                <p class="mb-6">Sabang, surga tersembunyi di ujung barat Indonesia, menawarkan keindahan alam yang memukau dan pengalaman yang tak terlupakan.</p>
                <p class="mb-6">Jelajahi pantai-pantai berpasir putih, terumbu karang yang menakjubkan, dan budaya lokal yang kaya. Sabang adalah destinasi sempurna untuk petualangan dan relaksasi.</p>
                <p class="mb-8">Nikmati keindahan bawah laut, jelajahi hutan tropis, dan rasakan keramahan masyarakat Sabang yang hangat.</p>
            </div>
            <div>
                <a href="#" class="bg-amber-400 text-black px-6 py-3 rounded-lg hover:bg-amber-500 transition inline-block font-medium uppercase">Jelajahi Sabang</a>
            </div>
        </div>
    </div>
</section>
<!-- Koleksi Destinasi Unggulan -->


<section class="py-16 bg-white pr-50 pl-50 mt-5">
    <div class="flex justify-between">
    <h1 class="text-5xl font-black text-black">Let`s Stroll Around</h1>
    <p class="text-amber-400 mt-3"><a href="">Lihat Selengkapnya</a></p>
</div>
    <div class="flex gap-4 overflow-x-auto mt-10 scroll-smooth">        {{-- card --}}
        <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
            <div class="p-4">

                  <p class="text-slate-800 text-xl font-black">
                    Kulineran
                  </p>

                  <p class="text-amber-500"><a href="">Read More <span class="fa-solid fa-arrow-right"></span> </a></p>

              </div>
            <div class="relative  h-60 overflow-hidden rounded-x-xl bg-clip-border">
              <img
                src="{{ asset('storage/img/kuliner.jpg') }}"
                alt="card-image"
                class="h-full w-full object-cover rounded-b-md"
              />
            </div>

          </div>
          {{-- end card --}}
          <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
            <div class="p-4">

                  <p class="text-slate-800 text-xl font-black">
                    Peresmian Revitalisasi Monumen
                  </p>

                  <p class="text-amber-500"><a href="">Read More <span class="fa-solid fa-arrow-right"></span> </a></p>

              </div>
            <div class="relative  h-60 overflow-hidden rounded-x-xl bg-clip-border">
              <img
                src="{{ asset('storage/img/carou7.jpg') }}"
                alt="card-image"
                class="h-full w-full object-cover rounded-b-md"
              />
            </div>

          </div>

        {{-- end card --}} <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
            <div class="p-4">

                <p class="text-slate-800 text-xl font-black">
                  Menjelajahi Pusat Kota
                </p>

                <p class="text-amber-500"><a href="">Read More <span class="fa-solid fa-arrow-right"></span> </a></p>

            </div>
          <div class="relative  h-60 overflow-hidden rounded-x-xl bg-clip-border">
            <img
              src="{{ asset('storage/img/carou12.jpg') }}"
              alt="card-image"
              class="h-full w-full object-cover rounded-b-md"
            />
          </div>

        </div>
        {{-- end card --}}
    </div>
</section>

<section class="py-16 ">
        <div class="mx-auto ">
        <div class="flex justify-between items-center mb-12 mr-50 ml-50 ">
            <h2 class="text-5xl font-bold text-black">Destinasi Unggulan</h2>
            <a href="/destinasi" class="bg-amber-400 text-black px-6 py-2 rounded hover:bg-amber-500 transition font-medium">Lihat Semua Destinasi</a>
        </div>
        <div class="overflow-hidden">
            <div class="marquee flex space-x-8 animate-marquee">
                <!-- Destinasi 1 -->
                <div class="bg-white rounded-lg overflow-hidden shadow-lg flex-shrink-0 w-64 border-1 ">
                    <div class="relative">
                        <img src="{{ asset('storage/img/destinasi1.jpg') }}" alt="Pantai Iboih" class="w-full h-64 object-cover">
                        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                            <h3 class="text-white font-bold">Pantai Iboih</h3>
                            <p class="text-white">Keindahan bawah laut yang memukau</p>
                        </div>
                    </div>
                </div>
                <!-- Destinasi 2 -->
                <div class="bg-white rounded-lg overflow-hidden shadow-lg flex-shrink-0 w-64 border-1 ">
                    <div class="relative">
                        <img src="{{ asset('storage/img/destinasi2.jpg') }}" alt="Pulau Rubiah" class="w-full h-64 object-cover">
                        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                            <h3 class="text-white font-bold">Pulau Rubiah</h3>
                            <p class="text-white">Surga snorkeling di Sabang</p>
                        </div>
                    </div>
                </div>
                <!-- Destinasi 3 -->
                <div class="bg-white rounded-lg overflow-hidden shadow-lg flex-shrink-0 w-64 border-1 ">
                    <div class="relative">
                        <img src="{{ asset('storage/img/destinasi3.jpg') }}" alt="Tugu Nol Kilometer" class="w-full h-64 object-cover">
                        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                            <h3 class="text-white font-bold">Tugu Nol Kilometer</h3>
                            <p class="text-white">Ikon Sabang yang wajib dikunjungi</p>
                        </div>
                    </div>
                </div>
                <!-- Destinasi 4 -->
                <div class="bg-white rounded-lg overflow-hidden shadow-lg flex-shrink-0 w-64 border-1">
                    <div class="relative">
                        <img src="{{ asset('storage/img/destinasi4.jpg') }}" alt="Pantai Sumur Tiga" class="w-full h-64 object-cover">
                        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                            <h3 class="text-white font-bold">Pantai Sumur Tiga</h3>
                            <p class="text-white">Pantai dengan pasir putih yang indah</p>
                        </div>
                    </div>
                </div>
                 <!-- Destinasi 1 -->
                 <div class="bg-white rounded-lg overflow-hidden shadow-lg flex-shrink-0 w-64 border-1">
                    <div class="relative">
                        <img src="{{ asset('storage/img/destinasi1.jpg') }}" alt="Pantai Iboih" class="w-full h-64 object-cover">
                        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                            <h3 class="text-white font-bold">Pantai Iboih</h3>
                            <p class="text-white">Keindahan bawah laut yang memukau</p>
                        </div>
                    </div>
                </div>
                <!-- Destinasi 2 -->
                <div class="bg-white rounded-lg overflow-hidden shadow-lg flex-shrink-0 w-64 border-1">
                    <div class="relative">
                        <img src="{{ asset('storage/img/destinasi2.jpg') }}" alt="Pulau Rubiah" class="w-full h-64 object-cover">
                        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                            <h3 class="text-white font-bold">Pulau Rubiah</h3>
                            <p class="text-white">Surga snorkeling di Sabang</p>
                        </div>
                    </div>
                </div>
                <!-- Destinasi 3 -->
                <div class="bg-white rounded-lg overflow-hidden shadow-lg flex-shrink-0 w-64 border-1">
                    <div class="relative">
                        <img src="{{ asset('storage/img/destinasi3.jpg') }}" alt="Tugu Nol Kilometer" class="w-full h-64 object-cover">
                        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                            <h3 class="text-white font-bold">Tugu Nol Kilometer</h3>
                            <p class="text-white">Ikon Sabang yang wajib dikunjungi</p>
                        </div>
                    </div>
                </div>
                <!-- Destinasi 4 -->
                <div class="bg-white rounded-lg overflow-hidden shadow-lg flex-shrink-0 w-64 border-1">
                    <div class="relative">
                        <img src="{{ asset('storage/img/destinasi4.jpg') }}" alt="Pantai Sumur Tiga" class="w-full h-64 object-cover">
                        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                            <h3 class="text-white font-bold">Pantai Sumur Tiga</h3>
                            <p class="text-white">Pantai dengan pasir putih yang indah</p>
                        </div>
                    </div>
                </div>
                <!-- Duplicate the items for seamless looping -->
                <div class="bg-white rounded-lg overflow-hidden shadow-lg flex-shrink-0 w-64 border-1">
                    <div class="relative">
                        <img src="{{ asset('storage/img/destinasi1.jpg') }}" alt="Pantai Iboih" class="w-full h-64 object-cover">
                        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                            <h3 class="text-white font-bold">Pantai Iboih</h3>
                            <p class="text-white">Keindahan bawah laut yang memukau</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-lg overflow-hidden shadow-lg flex-shrink-0 w-64 border-1">
                    <div class="relative">
                        <img src="{{ asset('storage/img/destinasi2.jpg') }}" alt="Pulau Rubiah" class="w-full h-64 object-cover">
                        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                            <h3 class="text-white font-bold">Pulau Rubiah</h3>
                            <p class="text-white">Surga snorkeling di Sabang</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-lg overflow-hidden shadow-lg flex-shrink-0 w-64 border-1">
                    <div class="relative">
                        <img src="{{ asset('storage/img/destinasi3.jpg') }}" alt="Tugu Nol Kilometer" class="w-full h-64 object-cover">
                        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                            <h3 class="text-white font-bold">Tugu Nol Kilometer</h3>
                            <p class="text-white">Ikon Sabang yang wajib dikunjungi</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-lg overflow-hidden shadow-lg flex-shrink-0 w-64 border-1 ">
                    <div class="relative">
                        <img src="{{ asset('storage/img/destinasi4.jpg') }}" alt="Pantai Sumur Tiga" class="w-full h-64 object-cover">
                        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                            <h3 class="text-white font-bold">Pantai Sumur Tiga</h3>
                            <p class="text-white">Pantai dengan pasir putih yang indah</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- Agenda Section -->

<!-- Choose a Tour Guide Section -->
<section class="py-16 bg-amber-500 pr-50 pl-50 mt-15">
    <div class="container mx-auto px-6">
        <div class="max-w-7xl mx-auto grid grid-cols-[1fr_4fr] justify-center items-center gap-8">
            <!-- Header Section -->
            <div class="mb-8">
                <h1 class="text-4xl font-black text-gray-900 mb-3">Pilih Pemandu Wisata Anda</h1>
                <p class="text-gray-600">Temukan pemandu wisata terbaik untuk pengalaman tak terlupakan di Sabang!</p>
            </div>
            <!-- Navigation Controls -->
            <div>
            <div class="flex justify-between items-center mb-6">
                <div class="flex gap-2">
                    <button id="prevBtn" class="p-2 border rounded-md hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button id="nextBtn" class="p-2 border rounded-md hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
                <a href="{{ route('tour-guides.index') }}" class="text-black hover:text-white">Lihat Semua Pemandu</a>
            </div>
            <!-- Carousel Container -->
            <div class="relative overflow-hidden ">
                <div id="carousel" class="flex gap-4 transition-transform duration-300">
                    <!-- Tour Guide 1 -->
                    <div class="flex-none bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/3 tour-guide-card cursor-pointer border-2 rounded-lg p-3 inset-shadow-sm border-gray-500" data-guide="Rina" data-specialty="Pakar Kuliner Lokal">
                        <div class="bg-white rounded-lg overflow-hidden">
                            <img src="{{ asset('storage/img/budi.png') }}" alt="Tour Guide Budi" class="w-full h-48 object-cover">
                            <div class="p-4">
                                <h3 class="text-lg font-semibold text-amber-600 mb-1">Budi</h3>
                                <p class="text-sm text-gray-600 mb-2">Ahli Sejarah Sabang</p>
                                <p class="text-sm text-gray-700 mb-2">Pengalaman mendalam tentang sejarah dan budaya Sabang.</p>
                                <div class="flex items-center">
                                    <svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <span class="ml-1 text-sm text-gray-700">4.8 (120 ulasan)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Tour Guide 2 -->
                    <div class="flex-none bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/3 tour-guide-card cursor-pointer border-2 rounded-lg p-3 shadow-md border-gray-500" data-guide="Rina" data-specialty="Pakar Kuliner Lokal">
                        <div class="bg-white rounded-lg overflow-hidden">
                            <img src="{{ asset('storage/img/siti.png') }}" alt="Tour Guide Siti" class="w-full h-48 object-cover">
                            <div class="p-4">
                                <h3 class="text-lg font-semibold text-amber-600 mb-1">Siti</h3>
                                <p class="text-sm text-gray-600 mb-2">Spesialis Wisata Bahari</p>
                                <p class="text-sm text-gray-700 mb-2">Panduan terbaik untuk menyelam dan snorkeling di Sabang.</p>
                                <div class="flex items-center">
                                    <svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <span class="ml-1 text-sm text-gray-700">4.9 (150 ulasan)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Tour Guide 3 -->
                    <div class="flex-none bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/3 tour-guide-card cursor-pointer border-2 rounded-lg p-3 shadow-md border-gray-500" data-guide="Rina" data-specialty="Pakar Kuliner Lokal">
                        <div class="bg-white rounded-lg overflow-hidden">
                            <img src="{{ asset('storage/img/ahmad.png') }}" alt="Tour Guide Ahmad" class="w-full h-48 object-cover">
                            <div class="p-4">
                                <h3 class="text-lg font-semibold text-amber-600 mb-1">Ahmad</h3>
                                <p class="text-sm text-gray-600 mb-2">Penggemar Alam dan Petualangan</p>
                                <p class="text-sm text-gray-700 mb-2">Petualangan seru menjelajahi hutan dan pantai Sabang.</p>
                                <div class="flex items-center">
                                    <svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <span class="ml-1 text-sm text-gray-700">4.7 (90 ulasan)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Tour Guide 4 -->
                    <div class="flex-none bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/3 tour-guide-card cursor-pointer border-2 rounded-lg p-3 shadow-md border-gray-500" data-guide="Rina" data-specialty="Pakar Kuliner Lokal">
                        <div class="bg-white rounded-lg overflow-hidden">
                            <img src="{{ asset('storage/img/rina.png') }}" alt="Tour Guide Rina" class="w-full h-48 object-cover">
                            <div class="p-4">
                                <h3 class="text-lg font-semibold text-amber-600 mb-1">Rina</h3>
                                <p class="text-sm text-gray-600 mb-2">Pakar Kuliner Lokal</p>
                                <p class="text-sm text-gray-700 mb-2">Wisata kuliner untuk mencicipi masakan khas Sabang.</p>
                                <div class="flex items-center">
                                    <svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <span class="ml-1 text-sm text-gray-700">4.6 (80 ulasan)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>


</section>

<section class="py-16 mr-50 ml-50 mt-15 flex gap-12">
    <img src="{{ asset('storage/img/sabangmap.png') }}" class="h-130 rounded-lg p-2 border-1" alt="">
    <div class="mt-15">
    <h1 class="font-black text-5xl mt-3">Agenda Sabang</h1>
    <p class="mt-5">Sabang memiliki sejumlah agenda yang memikat hati dengan keindahan alamnya yang luar biasa.
        <br> Dari pantai berpasir putih hingga terumbu karang yang memukau, Sabang menawarkan pengalaman tak terlupakan bagi para pelancong. Jelajahi pesona bawah laut, nikmati kehangatan budaya lokal, dan temukan surga tersembunyi di ujung barat Indonesia ini.</p>
       <a href="{{ route('agendas.index') }}"> <button class="bg-amber-400 text-black px-6 py-2 mt-5 rounded-lg hover:bg-amber-500 transition btn-amber">lihat semua agenda</button></a>
    </div></section>
  <x-carousel />
 
<style>


    /* Smooth scrolling behavior */
    .overflow-x-auto {
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
    }

    /* Hide scrollbar but keep functionality */
    .overflow-x-auto::-webkit-scrollbar {
        display: none;
    }
    .overflow-x-auto {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }

    /* Highlight selected tour guide card */
    .tour-guide-card.selected {
        border: 2px solid #FBBF24; /* Amber border for selected card */
    }

    /* Smooth scrolling behavior */
    .overflow-x-auto {
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
    }

    /* Hide scrollbar but keep functionality */
    .overflow-x-auto::-webkit-scrollbar {
        display: none;
    }
    .overflow-x-auto {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }

    /* Ensure buttons are visible and positioned correctly */
    .scroll-left-2024, .scroll-right-2024,
    .scroll-left-2025, .scroll-right-2025 {
        z-index: 10;
    }
    @layer utilities {
  @keyframes marquee {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-10%);
    }
  }

  .marquee {
    animation: marquee 20s linear infinite alternate;
    display: flex;
    width: max-content;
  }
}

</style>


@endsection
