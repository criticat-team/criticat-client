<script>
export default {
  props: {
    width: {
      type: Number,
      mandatory: false,
      default: 300,
    },
    innerGap: {
      type: Number,
      mandatory: false,
      default: 12,
    },
    outerGap: {
      type: Number,
      mandatory: false,
      default: 24,
    },
  },
  render(createElement) {
    return createElement(
      'ul',
      { class: 'slider-content' },
      this.$slots.default.map((element, index) => {
        let style;
        if (index === 0) {
          style = {
            minWidth: `${this.width + this.outerGap}px`,
            borderLeft: `${this.outerGap}px solid transparent`,
          };
        } else if (index < this.$slots.default.length - 1) {
          style = {
            marginLeft: `${this.innerGap}px`,
            minWidth: `${this.width}px`,
          };
        } else {
          style = {
            marginLeft: `${this.innerGap}px`,
            minWidth: `${this.width + this.outerGap}px`,
            borderRight: `${this.outerGap}px solid transparent`,
          };
        }
        return createElement('li', { style }, [element]);
      }),
    );
  },
};
</script>

<style lang="scss" scoped>
$distance: 12px;
.slider-content {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: visible;
  list-style-type: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
