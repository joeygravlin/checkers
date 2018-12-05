<template>
    <div id="menu">
        <ul>
            <router-link to="/game" activeClass="active" tag="li"><a class="nav-link">Play</a></router-link>
            <router-link to="/connect" activeClass="active" tag="li"><a class="nav-link">Connect</a></router-link>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style lang="sass" scoped>

    #menu
        ul
            list-style-type: none
            margin: 0 auto
            padding: 0
            display: flex
            justify-content: center
            width: 500px

            li
                padding: 5px
                margin: 5px
                box-shadow: 3px 2px 6px #000000
                transition: hover 1s
                user-select: none
                text-align: center

                &:hover
                    box-shadow: 5px 4px 8px #000000
                    cursor: pointer

                &:active
                    box-shadow: 1px 0px 4px #000000

                a
                    color: #000000
                    text-decoration: none

</style>


