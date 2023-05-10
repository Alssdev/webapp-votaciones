<template>
  <b-autocomplete
    v-model="dpi"
    :data="filteredData"
    field="dpi"
    @select="select"
    @typing="unset"
    clearable
    open-on-focus
    placeholder="Buscar ciudadanos por dpi..."
  >
  </b-autocomplete>
</template>

<script>
export default {
  props: {
    idemp: {
      type: Number,
      default: null
    }
  },

  data: () => ({
    ciudadanos: [],
    dpi: '',

    // control data
    // empty
  }),

  computed: {
    filteredData() {
      return this.ciudadanos.filter(option => {
        return (
          option.dpi
            .toString()
            .toLowerCase()
            .indexOf(this.dpi.toLowerCase()) >= 0
        )
      })
    }
  },

  watch: {
    idemp (idemp) {
      if (typeof idemp === 'number') {
        if (this.ciudadanos.length !== 0) {
          // only if fetch has finished
          this.selectByIdemp(idemp);
        }
      } else {
        this.clearAllData();
      }
    }
  },

  created () {
    this.fetchCiudadanos();
  },
  
  methods: {
    async fetchCiudadanos () {
      try {
        // fetch data
        const response = await this.$axios.$get('/ciudadanos');
        this.ciudadanos = response.list;

        // autoselect
        if (typeof this.idemp === 'number') {
          this.selectByIdemp(this.idemp);
        }
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    select (option) {
      if (option) {
        this.dpi = option.dpi;
        this.$emit('select', option);
      } else {
        this.unset();
      }
    },
    unset () {
      this.$emit('select', { idemp: null });
    },
    clearAllData () {
      this.dpi = '';
      this.unset();
    },

    selectByIdemp (idemp) {
      const selected = (this.ciudadanos.filter(option => (option.idemp === idemp)))[0];
      this.select(selected);
    }
  }
}
</script>

