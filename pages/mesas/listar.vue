<template>
  <div>
    <h1 class="title">Lista de Mesas</h1>

    <b-table
      :data="list"
      :selected.sync="selected"
      :per-page="10"
      hoverable
      striped
      paginated
    >
    <b-table-column field="nmesa" label="Número" searchable sortable v-slot="props">
      {{ props.row.nmesa }}
    </b-table-column>
    <b-table-column field="est.nombre" label="Establecimiento" searchable sortable v-slot="props">
      <nuxt-link :to="{ path: `/establecimientos/${props.row.est.idest}/data` }">
        {{ props.row.est.nombre }}
      </nuxt-link>
    </b-table-column>
    <b-table-column label="Datos" v-slot="props" width="80">
      <b-button
        type="is-info"
        icon-left="information"
        @click="$menu(`/mesas/${props.row.idmesa}/data`)"
      />
    </b-table-column>
    <b-table-column label="Editar" v-slot="props" width="80">
      <b-button
        type="is-warning"
        icon-left="pencil"
        @click="$menu(`/mesas/${props.row.idmesa}/edit`)"
      />
    </b-table-column>
    <b-table-column label="Eliminar" v-slot="props" width="80">
      <b-button
        type="is-danger"
        icon-left="delete"
        @click="confirmDelete(props.row.idmesa)"
      />
    </b-table-column>
    </b-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    list: [],
    selected: null
  }),

  created () {
    this.fetchData();
  },

  methods: {
    async fetchData () {
      try {
        const response = await this.$axios.$get('/mesas');
        this.list = response.list;
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    async delete (idmesa) {
      try {
        await this.$axios.delete(`/mesas/${idmesa}`);
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'La mesa ha sido borrada con éxito',
          duration: 5000
        });
        this.fetchData();
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    confirmDelete (idest) {
      this.$buefy.dialog.confirm({
        title: 'Confirmación',
        message: `Antes de completar el proceso debe 
        confirmar que está seguro ¿Desea continuar?`,
        onConfirm: () => { this.delete(idest) },
        hasIcon: true,
        type: 'is-danger',
      });
    }
  }
}
</script>