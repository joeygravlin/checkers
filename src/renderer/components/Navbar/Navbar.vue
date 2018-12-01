<template>
    <ul id="nav">
        <router-link to="/game" activeClass="active" tag="li"><a class="nav-link">Play</a></router-link>
        <router-link to="/connect" activeClass="active" tag="li"><a class="nav-link">Connect</a></router-link>
        <li>Dark Mode</li>
    </ul>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style lang="sass" scoped>

    #nav
        display: flex

</style>


