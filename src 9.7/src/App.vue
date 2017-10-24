<template>
  <div id="app">

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }

  #app {
    font-family: 'Microsoft YaHei', Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
  }

  .clearfix:after {
    content: '';
    clear: both;
    display: block;
  }

  .clearfix {
    zoom: 1;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  a {
    text-decoration: none;
    color: #83868E;
  }

  ul {
    list-style-type: none;
  }

  button {
    outline: none;
    border: none;
    list-style-type: none;
  }

  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
  }

  /*-------animation start------*/
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }

  .component-fade-enter, .component-fade-leave-active {
    opacity: 0;
  }

  .shake-enter-active {
    animation: shake .5s;
  }

  .shake-leave-active {
    transition: all 0.3s ease;
    opacity: 0;
  }

  @-webkit-keyframes shake {
    from, to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    10%, 30%, 50%, 70%, 90% {
      -webkit-transform: translate3d(-7px, 0, 0);
      transform: translate3d(-7px, 0, 0);
    }

    20%, 40%, 60%, 80% {
      -webkit-transform: translate3d(7px, 0, 0);
      transform: translate3d(7px, 0, 0);
    }
  }

  @keyframes shake {
    from, to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    10%, 30%, 50%, 70%, 90% {
      -webkit-transform: translate3d(-7px, 0, 0);
      transform: translate3d(-7px, 0, 0);
    }

    20%, 40%, 60%, 80% {
      -webkit-transform: translate3d(7px, 0, 0);
      transform: translate3d(7px, 0, 0);
    }
  }

  .shake {
    -webkit-animation-name: shake;
    animation-name: shake;
  }

  /*牙医ABC蓝色#5DB7E7;#5ed6dc;#04D8DD;红色#D81E06;*/
</style>
