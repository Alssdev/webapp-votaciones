<template>
  <b-autocomplete
    v-model="name"
    :data="filteredData"
    field="nombre"
    @select="select"
    clearable
    open-on-focus
    placeholder="Buscar municipios..."
    :disabled="disabled"
  >
  </b-autocomplete>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    iddep: {
      type: Number,
      default: null
    },
    defaultText: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    municipios: [],
    selected: null,
    name: ''
  }),

  computed: {
    filteredData() {
      return this.municipios.filter(option => {
        const nameFilter = option.nombre
            .toLowerCase()
            .indexOf(this.name.toLowerCase()) >= 0;
        const iddepFilter = typeof this.iddep === 'number' ? option.iddep === this.iddep : true;

        return iddepFilter && nameFilter;
      });
    }
  },

  created () {
    this.fetchMunicipios();
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
    async fetchMunicipios () {
      try {
        const response = await this.$axios.$get('/municipios');
        this.municipios = response.list;
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    select (option) {
      if (option) {
        this.$emit('select', option);
      } else {
        this.$emit('select', { idmunicipio: null });
      }
    }
  }
}
</script>

