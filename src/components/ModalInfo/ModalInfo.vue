<template>
    <div class="details" @click.self="$emit('closeModal')">
      <div class="details__wrapper">
        <div class="details__content">
          <div class="details__header">
            <button class="details__close" @click="closeModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
            <h5 class="details__title">{{details.name}}</h5>
          </div>
          <div class="details__body">
            <div class="details__field">
              <p class="details__name-text">{{details.description}}</p>
            </div>
            <div class="details__fields details__fields--creators">
              <h5 class="details__title">Создатели</h5>
              <div class="details__creators">
                <div class="details__creator" v-for="(item, index) in details.owners" :key="index">
                  <img class="details__avatar" :src="`${item?.avatar}`" alt="аватар" />
                  <p class="details__text">{{item.name}}</p>
                  <p class="details__text">{{item.email}}</p>
                  <p class="details__text">{{item.link}}</p>
                </div>
              </div>
            </div>
            <div class="details__bottom">
              <div class="details__fields details__fields--bottom">
                <h5 class="details__title">Последний обновлявший</h5>
                <img class="details__avatar" :src="`${details.lastPublisher?.avatar}`" alt="аватар" />
                <p class="details__text">{{details.lastPublisher.name}}</p>
                <p class="details__text">{{details.lastPublisher.email}}</p>
                <p class="details__text">{{details.lastPublisher.link}}</p>
              </div>
              <div v-if="details?.originalAuthor && details.originalAuthor?.name" class="details__field details__fields--bottom"> 
                <h5 class="details__title">Оригинальный автор</h5>
                <p class="details__text">{{details.originalAuthor.name}}</p>
                <p class="details__text">{{details.originalAuthor.email}}</p>
              </div>
              <div class="details__fields details__fields--bottom">
                <div class="details__links-wrapper">
                  <div v-if="details.repository?.url" class="details__links">
                    <h5 class="details__links-title">Репозиторий пакета</h5>
                    <p class="details__links-text"><a class="details__link list-group-item list-group-item-action" :href="`${details.repository.url}`">{{$store.state.packages[index].repository.url}}</a></p>
                  </div>
                  <div v-if="details.repository?.host" class="details__links">
                    <h5 class="details__links-title">Хост пакета</h5>
                    <p class="details__links-text"><a class="details__link list-group-item list-group-item-action" :href="`${details.repository.host}`">{{$store.state.packages[index].repository.host}}</a></p>
                  </div>
                  <div v-if="details?.homepage" class="details__links">
                    <h5 class="details__links-title">Домашняя страница</h5>
                    <p class="details__links-text"><a class="details__link list-group-item list-group-item-action" :href="`${details.homepage}`">{{$store.state.packages[index].homepage}}</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ['currentIndex', 'open'],
  name: 'ModalInfo',
  components: {},
  data() {
    return {
        index: this.currentIndex,
        modalVisible: this.open,
        details: {},
    }
  },
  created() {
    this.details = this.$store.state.packages[this.index]
  },
  methods: {
    closeModal() {
        this.$emit('closeModal');
    }
  },
}
</script>

<style lang="scss">
    @import './modal.scss';
</style>