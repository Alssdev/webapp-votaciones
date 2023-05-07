<template>
  <b-autocomplete
    v-model="name"
    :data="filteredData"
    field="nombre"
    @select="select"
    clearable
    open-on-focus
    placeholder="Buscar departamento..."
  >
  </b-autocomplete>
</template>

<script>
export default {
  props: {
    defaultText: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    departamentos: [],
    selected: null,
    name: ''
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

  created () {
    this.fetchDepartamentos();
    if (typeof this.defaultText === 'string') {
      this.name = this.defaultText;
    }
  },

  watch: {
    defaultText (newValue) {
      if (typeof newValue === 'string') {
        this.name = newValue;
      } else {
        this.name = '';
      }
    }
  },
  
  methods: {
    async fetchDepartamentos () {
      try {
        const response = await this.$axios.$get('/departamentos');
        this.departamentos = response.list;
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    select (option) {
      if (option) {
        this.$emit('select', option);
      } else {
        this.$emit('select', { iddep: null });
      }
    }
  }
}
</script>

