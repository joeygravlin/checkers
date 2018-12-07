<template>
  <div class="container" id="#app">
        <navbar></navbar>
        <div class="row">
            <div class="col-xs-12">
                <transition name="slide" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
  import Navbar from './components/Navbar'

  export default {
    name: 'checkers',
    components: {
      Navbar
    }
  }
</script>

<style>
  /* CSS */
</style>
