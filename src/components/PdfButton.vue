<template>
  <v-list-item @click="createPDF">
    <v-list-item-action>
      <v-icon>{{ mdiPdfBox }}</v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>Générer contrat</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import JsPdf from 'jspdf'
import { mdiPdfBox } from '@mdi/js'

export default {
  name: 'PdfButton',
  data: function () {
    return {
      mdiPdfBox
    }
  },
  methods: {
    createPDF () {
      const pdfName = 'Contrat'
      const doc = new JsPdf()
      doc.setFontSize(30)
      doc.setFontStyle('bold')
      doc.text(
        "CONTRAT DE LOCATION D'UNE SALLE",
        105,
        20,
        null,
        null,
        'center'
      )
      doc.setFontSize(20)
      doc.text('Entre :', 10, 50)
      doc.setFontSize(15)
      doc.setFontStyle('normal')
      doc.text(
        'La Commune Brest representée par son Maire, Monsieur François Cuillandre',
        10,
        70
      )
      doc.text('domicilié 5, rue Victor Hugo', 10, 80)
      doc.text('29200 - Brest – tél. 01.23.45.67.89', 10, 90)
      doc.setFontSize(20)
      doc.setFontStyle('bold')
      doc.text('Et le réservataire :', 10, 110)
      doc.setFontSize(15)
      doc.setFontStyle('normal')
      doc.text('Nom et Prénom : Dupont Jean', 10, 130)
      doc.text('Adresse : 2, rue de Brest 29200 Brest', 10, 140)
      doc.text('Téléphone fix : 02.98.55.55.55', 10, 150)
      doc.text('Téléphone mobile : 07.86.12.34.56', 10, 160)
      doc.text('Location de la salle : Jean Monet', 10, 180)
      doc.text('Le 17/12/2019 de 20h à 22h', 10, 190)
      doc.text('Objet de la réservation : Danse Bretonne', 10, 200)
      doc.save(pdfName + '.pdf')
    }
  }
}
</script>
