<template>
  <div>
    <h1 class="title mb-6">Crear un municipio</h1>

    <b-field label="Nombre">
      <b-input placeholder="Ej. Guatemala" maxlength="30" />
    </b-field>
    <b-field label="Número de habitantes">
      <b-input type="number" step="1" min="0" placeholder="100000" />
    </b-field>
    <b-field label="Departamento">
      <input-departamento />
    </b-field>

    <div class="buttons mt-6">
      <b-button icon="pencil" type="is-primary">Crear</b-button>
    </div>
  </div>
</template>