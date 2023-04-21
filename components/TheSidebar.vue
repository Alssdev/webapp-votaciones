<template>
  <b-sidebar
    type="is-light"
    position="static"
    fullwidth
    open
  >
    <div class="p-4">
      <b-menu>
        <b-menu-list label="Administración">
          <b-menu-item icon="earth" label="Departamentos">
            <b-menu-item icon="pencil" label="Crear" />
            <b-menu-item icon="magnify" label="Ver lista" />
          </b-menu-item>
          <b-menu-item icon="earth" label="Municipios">
            <b-menu-item icon="pencil" label="Crear" />
            <b-menu-item icon="magnify" label="Ver lista" />
          </b-menu-item>
          <b-menu-item icon="office-building" label="Establecimientos">
            <b-menu-item icon="pencil" label="Crear" />
            <b-menu-item icon="magnify" label="Ver lista" />
          </b-menu-item>
          <b-menu-item icon="package-variant" label="Mesas">
            <b-menu-item icon="pencil" label="Crear" />
            <b-menu-item icon="magnify" label="Ver lista" />
          </b-menu-item>
          <b-menu-item icon="account-group" label="Partidos políticos">
            <b-menu-item icon="pencil" label="Crear" />
            <b-menu-item icon="magnify" label="Ver lista" />
          </b-menu-item>
        </b-menu-list>
        <b-menu-list label="Empadronamiento">
          <b-menu-item icon="account-multiple-check" label="Ciudadanos">
            <b-menu-item icon="pencil" label="Registrar" />
            <b-menu-item icon="magnify" label="Ver lista" />
          </b-menu-item>
        </b-menu-list>
        <b-menu-list label="Reportes">
          <b-menu-item icon="" label="Pendiente..."></b-menu-item>
        </b-menu-list>  
      </b-menu>    
    </div>
  </b-sidebar>
</template>