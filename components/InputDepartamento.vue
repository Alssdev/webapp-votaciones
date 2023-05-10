<template>
  <b-autocomplete
    v-model="name"
    :data="filteredData"
    field="nombre"
    @select="select"
    @typing="unset"
    open-on-focus
    placeholder="Buscar departamentos..."
    :clearable="!readonly"
    :readonly="readonly"
  >
  </b-autocomplete>
</template>

<script>
export default {
  props: {
    iddep: {
      type: Number,
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    departamentos: [],
    name: '',

    // control data
    // empty
  }),

  computed: {
    filteredData() {
      return this.departamentos.filter(option => {
        return (
          option.nombre
            .toString()
            .toLowerCase()
            .indexOf(this.name.toLowerCase()) >= 0
        )
      })
    }
  },

  watch: {
    iddep (iddep) {
      if (typeof iddep === 'number') {
        if (this.departamentos.length !== 0) {
          // only if fetch has finished
          this.selectByIddep(iddep);
        }
      } else {
        // clear all data
        this.name = '';
        this.unset();
      }
    }
  },

  created () {
    this.fetchDepartamentos();
  },
  
  methods: {
    async fetchDepartamentos () {
      try {
        // fetch data
        const response = await this.$axios.$get('/departamentos');
        this.departamentos = response.list;

        // autoselect
        if (typeof this.iddep === 'number') {
          this.selectByIddep(this.iddep);
        }
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    select (option) {
      if (option) {
        this.name = option.nombre;
        this.$emit('select', option);
      } else {
        this.unset();
      }
    },
    unset () {
      this.$emit('select', { iddep: null });
    },
    selectByIddep (iddep) {
      const selected = (this.departamentos.filter(option => (option.iddep === iddep)))[0];
      this.select(selected);
    }
  }
}
</script>

