<template>
  <div class="index-container">
    <div id="first-element" class="design-sort">
      <h1 class="sort-title">Sort By</h1>
      <button
        @click="sortDesigns('Website')"
        v-bind:class="[
          'btn',
          'sort-button',
          currentType === 'Website' ? 'selected' : ''
        ]"
      >
        Web Design
      </button>
      <button
        @click="sortDesigns('3D')"
        v-bind:class="[
          'btn',
          'sort-button',
          currentType === '3D' ? 'selected' : ''
        ]"
      >
        3D Design
      </button>
    </div>

    <DesignsComponent
      v-if="renderDesigns.length > 0"
      v-for="n in Math.ceil(renderDesigns.length / 7)"
      :designs="renderDesigns.slice(7 * n - 7, 7 * n)"
      :key="n"
    />

    <DesignsComponent
      v-if="renderDesigns.length === 0"
      v-for="n in Math.ceil(designs.length / 7)"
      :designs="designs.slice(7 * n - 7, 7 * n)"
      :key="n"
    />
  </div>
</template>

<script>
import designsQuery from '~/apollo/queries/design/designs';
import DesignsComponent from '~/components/DesignsComponent';

export default {
  components: {
    DesignsComponent
  },

  data() {
    return {
      designs: [],
      currentType: null,
      renderDesigns: []
    };
  },

  mounted() {
    this.renderDesigns = this.designs;
  },

  methods: {
    sortDesigns(type) {
      if (type && (this.currentType === null || this.currentType !== type)) {
        this.currentType = type;
        this.renderDesigns = this.designs.filter(
          (design) => design.category.name === type
        );
      } else {
        this.renderDesigns = this.designs;
        this.currentType = null;
      }
    }
  },

  apollo: {
    designs: {
      prefetch: true,
      query: designsQuery,
      variables() {
        return { id: parseInt(this.$route.params.id) };
      }
    }
  }
};
</script>

<style lang="sass">
.index-container
  position: relative
  max-height: 0

.design-sort
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  flex-wrap: wrap
  margin: 40px auto

  .sort-button
    color: $bg-alternative
    background-color: $bg-light
    width: 300px
    margin: 0 5px

    &:hover
      color: $font-colour

      background-color: $bg-alternative-light

  .selected
    color: $font-colour
    background-color: $bg-alternative

  .sort-title
    margin: 20px 0
    font-family: $font-family
    font-weight: 200
    color: $bg-alternative
    text-align: center
    width: 100%



@media (max-width: $breakpoint-tablet)

  .design-sort
    top: -200px

    .sort-button
      width: 80%
      margin: 5px 0

@media (max-width: $breakpoint-mobile-L)

  .design-sort
    .sort-button
      width: 90%
</style>
