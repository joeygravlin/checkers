<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/" class="navbar-brand">Checkers</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link to="/game" activeClass="active" tag="li"><a class="nav-link">Game</a></router-link>
        <router-link to="/connect" activeClass="active" tag="li"><a class="nav-link">Connect</a></router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

