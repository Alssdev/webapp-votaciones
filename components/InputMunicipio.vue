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
    iddep: {
      type: Number,
      default: null
    },
    defaultText: {
      type: String,
      default: ''
    },
    requireDepto: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    municipios: [],
    selected: null,
    
    // control data
    name: '',
    fetchFinished: false
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
    },

    disabled () {
      return (this.requireDepto ? typeof this.iddep !== 'number' : false);
    }
  },

  created () {
    this.fetchMunicipios();
  },

  watch: {
    iddep () {
      if (this.fetchFinished) {
        console.log('2');
        this.name = '';
        this.select(null);
      }
    },
    
  },
  
  methods: {
    async fetchMunicipios () {
      try {
        const response = await this.$axios.$get('/municipios');
        this.municipios = response.list;

        if (this.defaultText.length !== 0) {
          this.name = this.defaultText;
          this.selectByName(this.defaultText);
        }
        this.fetchFinished = true;
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
    },
    selectByName (nombre) {
      const selected = (this.municipios.filter(option => (option.nombre === nombre)))[0];
      this.select(selected);
    }
  }
}
</script>

