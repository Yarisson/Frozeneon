<template>
  <section>
    <modal-info @close-modal="closeModal" @keydown.esc="closeModal" v-if="modalInfo" :open="modalInfo" :currentIndex="currentIndex" tabindex="0"></modal-info>

  <ais-instant-search class="'purple accent-2'" :initial-ui-state="initialUiState" :search-client="searchClient" index-name="npm-search" :class-names="{'ais-InstantSearch': 'search', }" :routing="routing" :search-function="searchFunction" >
  <ais-search-box>
    <template v-slot="{ isSearchStalled, refine }">
      <form action="" role="search" novalidate="" class="ais-SearchBox-form search__form">
        <input
          class="ais-SearchBox-input search__input"
          placeholder="поиск npm пакетов"
          type="search"
          v-model="searchQuery"
          @input="refineSearch(refine, $event.currentTarget.value)"
        >
        <span :hidden="!isSearchStalled">Loading...</span>
        <button v-show="searchQuery !== ''" @click="clearQuery" type="reset" title="Remove the query" class="ais-SearchBox-reset"><svg role="img" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" class="ais-SearchBox-resetIcon"><path d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z" fillRule="evenodd"></path></svg></button>
      </form>
    </template>
  </ais-search-box>
      <ais-configure :hits-per-page.camel="10">
          <ais-hits v-if="searchQuery !== ''" :class-names="{'ais-Hits': 'search__hits', 'ais-Hits-list': 'search__hits-list'}" :transform-items="transformItems">
        <template v-slot="{ items}">
          <article @click="openModal(index)" data-toggle="modal" data-target="#exampleModal" class="search__item" v-for="(item, index) in items" :key="item.objectID">
            <div class="search__item-row"><span class="search__item-description">Номер пакета - </span> <span class="search__item-text">{{ index + 1 }}</span></div>
            <div class="search__item-row"><span class="search__item-description">Название пакета</span> <span class="search__item-text">{{ item.name }}</span></div>
            <div class="search__item-row search__item-row--vertical"><span class="search__item-description search__item-description--vertical">Описание пакета</span> <span class="search__item-text">{{ item.description }}</span></div>
            <div class="search__item-row"><span class="search__item-description">Домашняя страница</span><div class="search__item-text"><a class="search__item-link list-group-item list-group-item-action" v-if="item?.homepage" :href="item.homepage">{{ item.homepage }}</a><span v-else>-</span></div></div>
          </article>
  </template>
    </ais-hits>
      </ais-configure>
    <div v-if="searchQuery !== ''" class="pagination search__pagination" >
      <ais-pagination :class-names="{
        'ais-Pagination': 'search__pagination-wrapper',
        'ais-Pagination-list': 'search__pagination-list',
        'ais-Pagination-item': 'search__pagination-item',
        'ais-Pagination-item--firstPage': 'search__pagination-first',
        'ais-Pagination-item--lastPage': 'search__pagination-last',
        'ais-Pagination-item--previousPage': 'search__pagination-previous',
        'ais-Pagination-item--nextPage': 'search__pagination-next',
        'ais-Pagination-link': 'search__pagination-link',
      }" />
    </div>
  </ais-instant-search>
  <router-view />
  </section>
</template>

<script>
import { history } from 'instantsearch.js/es/lib/routers';
import { singleIndex as singleIndexMapping } from 'instantsearch.js/es/lib/stateMappings';
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/satellite-min.css';
import ModalInfo from '../ModalInfo/ModalInfo.vue';

export default {
  name: 'InstantSearch',
  components: {
    ModalInfo
},
  data() {
    return {
      searchQuery: '',
      searchClient: algoliasearch(
        'OFCNCOG2CU',
        'f54e21fa3a2a0160595bb058179bfb1e',
        { protocol: 'https:' },
      ),
      initialUiState: {
        indexName: {
          query: '',
          page: 10,
        },
      },
      currentIndex: 0,
      modalInfo: false,
      searchValue: '',
      routing: {
          router: history(),
          stateMapping: singleIndexMapping('instant_search'),
        },
    };
  },
  created() {
    this.searchQuery = ''
  },
      methods: {
      transformItems(items) {
        this.$store.commit('replacePackages', items)
        return items.map(item => ({
          ...item,
          name: item.name.toUpperCase(),
        }));
      },
      openModal(it) {
        this.currentIndex = it;
        this.modalInfo = true;
      },
      refineSearch(refine, value) {
        this.searchQuery = value;
        refine(value);
      },
      clearQuery() {
        this.searchQuery = '';
      },
      closeModal() {
        this.modalInfo = false;
      },
    },
}
</script>

<style lang="scss">
  @import './search.scss';
</style>