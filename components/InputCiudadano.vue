<template>
  <b-autocomplete
    v-model="dpinombre"
    :data="filteredData"
    field="dpinombre"
    @select="select"
    @typing="unset"
    :clearable="!readonly"
    open-on-focus
    placeholder="Buscar ciudadanos por dpi..."
    :readonly="readonly"
  >
  </b-autocomplete>
</template>

<script>
export default {
  props: {
    idemp: {
      type: Number,
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    ciudadanos: [],
    dpinombre: '',

    // control data
    // empty
  }),

  computed: {
    filteredData() {
      return this.ciudadanos.filter(option => {
        return (
          option.dpinombre
            .toString()
            .toLowerCase()
            .indexOf(this.dpinombre.toLowerCase()) >= 0
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
        let ciudadanos = response.list;

        this.ciudadanos = ciudadanos.map((c) => {
          c.dpinombre = `${c.dpi} | ${c.nombres}${c.apellidos}`;
          return c;
        });

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
        this.dpinombre = option.dpinombre;
        this.$emit('select', option);
      } else {
        this.unset();
      }
    },
    unset () {
      this.$emit('select', { idemp: null });
    },
    clearAllData () {
      this.dpinombre = '';
      this.unset();
    },

    selectByIdemp (idemp) {
      const selected = (this.ciudadanos.filter(option => (option.idemp === idemp)))[0];
      this.select(selected);
    }
  }
}
</script>

