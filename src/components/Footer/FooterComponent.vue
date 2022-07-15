<template>
    <footer class="footer">
        <div class="footer__wrapper list-group">
            <h3 class="footer__author">Автор - Ярослав Колобков</h3>
            <img class="footer__img" alt="моя фотка" :src="require('@/assets/img/me.jpg')"/>
            <p class="footer__text"><a class="footer__link list-group-item list-group-item-action" href="https://github.com/Yarisson">github.com/Yarisson</a></p>
        </div>
    </footer>
    
</template>

<script>

export default {
  name: 'FooterComponent',
  components: {

  },
}
</script>

<style lang="scss">
    @import './footer.scss';
</style>