<script>
export default {
  render(createElement) {
    return createElement(
      'ul',
      { class: 'slider' },
      this.$slots.default.map((element, index) =>
        createElement('li', { class: 'slider__item' }, [element]),
      ),
    );
  },
};
</script>

<style lang="scss" scoped>
.slider {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: visible;
  padding: 8px 0;
  list-style-type: none;
  &__item {
    min-width: 320px;
    margin-left: 12px;
    &:first-child {
      margin-left: 0;
    }
  }
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
