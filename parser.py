import sys


class Parser:
    def __init__(self, nom_de_fichier):
        fichier_entrant = open(nom_de_fichier, 'r')
        self.lignes = fichier_entrant.readlines()
        fichier_entrant.close()

        self.fichier_sortant = open(nom_de_fichier[:-4] + "_moyenne.csv", "w")

        self.nom_col_originale = self.lignes.pop(0)
        self.nom_col = self.nom_col_originale.split()

        self.dict_valeur = {}

        self.__init_dict_valeur__()

    def run(self):

        self.__remplissage_dictionnaire_valeur__()

        self.__ecriture_fichier_sortant__()

    def __init_dict_valeur__(self):
        for clef in self.nom_col:
            self.dict_valeur[clef] = {1: 0}
            for generation in range(5, 451, 5):
                self.dict_valeur[clef].setdefault(generation, 0)

    def __remplissage_dictionnaire_valeur__(self):
        for line in self.lignes:
            ligne = line.split()
            generation = int(ligne[1])
            for i in range(len(ligne)):
                self.dict_valeur[self.nom_col[i]][generation] += float(ligne[i]) if float(
                    ligne[i]).hex() != 'nan' else 0

    def __ecriture_fichier_sortant__(self):
        self.fichier_sortant.write(self.nom_col_originale[10:].replace(' ',","))
        compteur_de_generation = 1
        for generation in self.dict_valeur['replicate'].keys():
            for parametre in self.dict_valeur.keys():
                if parametre == "generation":
                    self.fichier_sortant.write("{},".format(compteur_de_generation))
                    compteur_de_generation += 5 if compteur_de_generation % 5 == 0 else 4
                elif parametre != "replicate":
                    self.dict_valeur[parametre][generation] /= 6  # moyenne sur 6 réplicats
                    # NB: nombre de réplicats adaptables en prenant le max de la valeur de la 1ere
                    self.fichier_sortant.write("%.4e," % self.dict_valeur[parametre][generation])
            self.fichier_sortant.write("\n")
        self.fichier_sortant.close()


if __name__ == '__main__':
    parser = Parser(sys.argv[1])
    parser.run()
