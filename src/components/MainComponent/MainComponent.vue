<template>
    <Section>
        <Search />
        <footer-component></footer-component>
    </Section>
</template>

<script>
import Search from '@/components/Search/Search.vue';
import FooterComponent from '@/components/Footer/FooterComponent.vue';

export default {
  name: 'MainComponent',
  components: {
    Search,
    FooterComponent
  }
}
</script>