<template>
  <div>
    <h1 class="title">Lista de ciudadanos empadronados</h1>

    <b-table
      :data="list"
      :selected.sync="selected"
      :per-page="10"
      hoverable
      striped
      paginated
    >
      <b-table-column field="idemp" label="No. Emp." width="150" v-slot="props" searchable sortable>
        {{ props.row.idemp }}
      </b-table-column>
      <b-table-column field="nombres" label="Nombres" v-slot="props" searchable>
        {{ props.row.nombres }}
      </b-table-column>
      <b-table-column field="apellidos" label="Apellidos" v-slot="props" searchable>
        {{ props.row.apellidos }}
      </b-table-column>
      <b-table-column label="Datos" v-slot="props">
        <b-button
          type="is-info"
          icon-left="information"
          @click="$menu(`/ciudadanos/${props.row.idemp}/data`)"
        />
      </b-table-column>
      <b-table-column label="Editar" v-slot="props">
        <b-button
          type="is-warning"
          icon-left="pencil"
          @click="$menu(`/ciudadanos/${props.row.idemp}/edit`)"
        />
      </b-table-column>
      <b-table-column label="Datos" v-slot="props">
        <b-button
          type="is-danger"
          icon-left="delete"
          @click="confirmDelete(props.row.idemp)"
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
        const response = await this.$axios.$get('/ciudadanos');

        const list = response.list.map((ciudadano) => {
          ciudadano.nombres = ciudadano.nombres.replaceAll(',', ' ').trim().toUpperCase();
          ciudadano.apellidos = ciudadano.apellidos.replaceAll(',', ' ').trim().toUpperCase();

          return ciudadano;
        });
        this.list = list;
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    async delete (idemp) {
      try {
        await this.$axios.delete(`/ciudadanos/${idemp}`);
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El ciudadano ha sido borrado con éxito',
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