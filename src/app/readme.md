MPU FORMULARMANAGER README
#####################################################################

# Aktuelle Version: 1 (alpha) 

# CHANGELOG
----------------------------------------------------------


# ARCHITEKTUR

## Basis
Angular6 mit Stores



# IDEEN

## Komponenten
Die Detail-Komponenten verwaltet ein geladenes aktives Formular. Darauf gibt es jeweils ein bestimmten View:
- Modellieren: Zum Bearbeiten eines Formulars
- Spezifikation: Ansicht für den Formularmodellierer
- Vergleichen: Vergleich zwischen zwei Formularversionen
- Vorschau: Live-Vorschau im MPU-Style

Herzstück ist das DataService, welches die eigentlichen Logiken enthält und in jede Komponente injiziert wird.
Durch Observables werden alle Views synchron gehalten, wodurch z.B. eine Formularänderung sofort im Preview sichtbar wird

## Grids
Jedes Formular ist in Grids strukturiert. Die oberste Hierarchie sind Formularseiten, darunter können in beliebiger Tiefe Gruppen folgen.
Grids sind wie andere Elemente im Formular änderbar, enthalten aber weitere Elemente über das rows-Array.

## Elemente
Globale Einstellungen der Elemente sind in der Config möglich. Die Eigenschaften für einzelne Instanzen werden über controls.ts gesteuert.
Achtung: Aktuell werden nur Objekte mit Funktionen/Methoden (z.B. FormGrids) explizit instanziiert, normale Elemente sind zwar Klassen (aufgrund der Vererbung), werden aber in den Konstruktoren nicht extra instanziiert (über new).
Die Erstellung von Elementen läuft über ein Factory-Pattern.