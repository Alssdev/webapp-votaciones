<template>
  <div>
    <h1 class="title">Lista de municipios</h1>

    <b-table
      :data="list"
      :selected.sync="selected"
      :per-page="10"
      hoverable
      striped
      paginated
    >
      <b-table-column field="nombre" label="Nombre" searchable sortable v-slot="props">
        {{ props.row.nombre }}
      </b-table-column>
      <b-table-column field="dnombre" label="Departamento" searchable sortable v-slot="props">
        {{ props.row.dnombre }}
      </b-table-column>
      <b-table-column field="numh" label="Num. Habitantes" sortable v-slot="props">
        {{ props.row.numh }}
      </b-table-column>
      <b-table-column label="Editar" v-slot="props" width="80">
        <b-button
          type="is-info"
          icon-left="pencil"
          @click="$menu(`/municipios/${props.row.idmunicipio}/edit`)"
        />
      </b-table-column>
      <b-table-column label="Eliminar" v-slot="props" width="80">
        <b-button
          type="is-danger"
          icon-left="delete"
          @click="confirmDelete(props.row.idmunicipio)"
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
        const response = await this.$axios.$get('/municipios');
        this.list = response.list;
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    async delete (idmunicipio) {
      try {
        await this.$axios.$delete(`/municipios/${idmunicipio}`);
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El municipio ha sido borrado con éxito',
          duration: 5000
        });
        this.fetchData();
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    confirmDelete (nombre) {
      this.$buefy.dialog.confirm({
        title: 'Confirmación',
        message: `Antes de completar el proceso debe 
        confirmar que está seguro ¿Desea continuar?`,
        onConfirm: () => { this.delete(nombre) },
        hasIcon: true,
        type: 'is-danger',
      });
    }
  }
}
</script>