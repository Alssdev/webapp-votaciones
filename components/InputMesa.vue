<template>
  <b-autocomplete
    v-model="nmesa"
    :data="filteredData"
    field="nmesa"
    @select="select"
    clearable
    open-on-focus
    placeholder="Buscar mesas..."
    :disabled="disabled"
  >
  </b-autocomplete>
</template>

<script>
export default {
  props: {
    idmesa: {
      type: Number,
      default: null
    },
    idest: {
      type: Number,
      default: null
    },
    requireEst: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    mesas: [],
    nmesa: '',
    
    // control data
    // empty
  }),

  computed: {
    filteredData() {
      return this.mesas.filter(option => {
        const nFilter = option.nmesa
            .toString()
            .toLowerCase()
            .indexOf(this.nmesa.toString().toLowerCase()) >= 0;
        const estFilter = typeof this.idest === 'number' ? option.idest === this.idest : true;

        return nFilter && estFilter;
      });
    },

    disabled () {
      return (this.requireEst ? typeof this.idest !== 'number' : false);
    }
  },

  created () {
    this.fetchMesas();
  },

  watch: {
    idest (newValue, oldValue) {
      if (oldValue !== null) {
        this.clearAllData();
      }
    },
    idmesa (idmesa) {
      if (typeof idmesa === 'number') {
        if (this.mesas.length !== 0) {
          // only if fetch has finished
          this.selectByIdmesa(idmesa);
        }
      } else {
        this.clearAllData();
      }
    }
  },
  
  methods: {
    async fetchMesas () {
      try {
        // fetch Data
        const response = await this.$axios.$get('/mesas');
        this.mesas = response.list;

        // autoselect
        if (typeof this.idmesa === 'number') {
          this.selectByIdmesa(this.idmesa);
        }
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    select (option) {
      if (option) {
        this.nmesa = option.nmesa;
        this.$emit('select', option);
      } else {
        this.unset();
      }
    },
    unset () {
      this.$emit('select', { idmesa: null });
    },
    selectByIdmesa (idmesa) {
      const selected = (this.mesas.filter(option => (option.idmesa === idmesa)))[0];
      this.select(selected);
    },
    clearAllData () {
      this.nmesa = '';
      this.unset();
    }
  }
}
</script>

