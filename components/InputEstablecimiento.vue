<template>
  <b-autocomplete
    v-model="name"
    :data="filteredData"
    field="nombre"
    @select="select"
    clearable
    open-on-focus
    placeholder="Buscar establecimientos..."
    :disabled="disabled"
  >
  </b-autocomplete>
</template>

<script>
export default {
  props: {
    idest: {
      type: Number,
      default: null
    },
    idmunicipio: {
      type: Number,
      default: null
    },
    requireMuni: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    establecimientos: [],
    name: '',
    
    // control data
    // empty
  }),

  computed: {
    filteredData() {
      return this.establecimientos.filter(option => {
        const nameFilter = option.nombre
            .toLowerCase()
            .indexOf(this.name.toLowerCase()) >= 0;
        const muniFilter = typeof this.idmunicipio === 'number' ? option.idmunicipio === this.idmunicipio : true;

        return muniFilter && nameFilter;
      });
    },

    disabled () {
      return (this.requireMuni ? typeof this.idmunicipio !== 'number' : false);
    }
  },

  created () {
    this.fetchEstablecimientos();
  },

  watch: {
    idmunicipio (newValue, oldValue) {
      if (oldValue !== null) {
        this.clearAllData();
      }
    },
    idest (idest) {
      if (typeof idest === 'number') {
        if (this.establecimientos.length !== 0) {
          // only if fetch has finished
          this.selectByIdest(idest);
        }
      } else {
        this.clearAllData();
      }
    }
  },
  
  methods: {
    async fetchEstablecimientos () {
      try {
        // fetch Data
        const response = await this.$axios.$get('/establecimientos');
        this.establecimientos = response.list;

        // autoselect
        if (typeof this.idest === 'number') {
          this.selectByIdest(this.idest);
        }
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    select (option) {
      if (option) {
        this.name = option.nombre;
        this.$emit('select', option);
      }
    },
    unset () {
      this.$emit('select', { idest: null });
    },
    selectByIdest (idest) {
      const selected = (this.establecimientos.filter(option => (option.idest === idest)))[0];
      this.select(selected);
    },
    clearAllData () {
      this.name = '';
      this.unset();
    }
  }
}
</script>

