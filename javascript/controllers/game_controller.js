import { Controller } from "stimulus";
import Swal from 'sweetalert2';

export default class extends Controller {
	static targets = ['mainContainer', 'playerList', 'numPlayers', 'letterContainer', 'categoryContainer', 'player']

  connect() {
    const letters = [...Array(26)].map((q,w)=>String.fromCharCode(w+97).toUpperCase());
    this.letters = letters;
    const categories = ["Ville Française", "Ville Étrangère", "Pays", "Animal", "Prénom Masculin", "Prénom Féminin", "Profession", "Arbre", "Fleur", "Sport", "Chanteur", "Chanteuse", "Acteur", "Actrice", "Couleur", "Fleuve ou Rivière", "Athlète de haut niveau", "Auteur", "Marque", "Héros", "Fruit", "Peintre", "Personnalité politique"]
    this.categories = categories
  }

  async focus() {
  	document.getElementById('player').focus();
  }
  async addPlayerForm() {
  	this.mainContainerTarget.innerHTML = `
  		<div class="row justify-content-center" data-target="game.formPlayer">
  			<div class="col-6">
		  		<form action="">
		 				<div class="form-group">
			  			<label for="player"></label>
			  			<input type="text" placeholder="nom du joueur" id="player" class="form-control">
		 				</div>
		  			<input type="submit" value="Ajouter" class="btn btn-primary w-100" data-action="click->game#addPlayer">
		  		</form>
  			</div>
  		</div>
  	`
  	await this.focus();
  }

  addPlayer() {
  	const playerName = document.getElementById('player').value;
  	const numberOfPlayer = this.playerListTarget.querySelectorAll('li').length;
  	this.playerListTarget.insertAdjacentHTML('beforeend', `<li data-name="${playerName}" data-score="0" data-target="game.player" data-id="${numberOfPlayer + 1}" class="list-inline-item" data-action="click->game#addPoint">${playerName}</li>`);
  	this.mainContainerTarget.innerHTML = "";
  	this.numPlayersTarget.innerHTML = `<b>${numberOfPlayer + 1}</b> Joueurs`;
  }

  addPoint() {
  	const player = event.currentTarget;
  	const score = parseInt(player.dataset.score, 10);
  	const name = player.dataset.name;
  	player.dataset.score = score + 1;
  	player.innerHTML = `${name} <span class="points">${score + 1}</span>`;
  	setTimeout(this.checkWinner(player), 1000) ;
  }

  computeScores() {
  	return this.playerTargets.map((player) => Object.create({name: player.dataset.name, score: parseInt(player.dataset.score)}));

  }

  sentence(obj) {
  	return `<li>${obj.name}: ${obj.score}</li>`;
  }
  checkWinner(player) {
  	if (parseInt(player.dataset.score) == 10 ) {
  		const array = this.computeScores();
  		Swal.fire({
  		  title: `🎉🎉🎉 ${player.dataset.name} a gagné !! 🎉🎉🎉`,
  		  text: `
  		  	Les scores ici... bientôt ! Mais là je dois jouer avec ma Louloutte d'Amour que j'aime fort ❤️
  		  `,
  		  confirmButtonText: 'Trop fort ! 👏'
  		})
  	}
  }

  randomLetter() {
		const letter = this.letters[Math.floor(Math.random() * this.letters.length)];
		this.letterContainerTarget.innerHTML = letter;
  }

  randomCategory() {
  	const category = this.categories[Math.floor(Math.random() * this.categories.length)]
  	this.categoryContainerTarget.innerHTML = category
  	this.categoryContainerTarget.classList.add('active');
  }

  async fetchLetter() {
  	this.categoryContainerTarget.style.minHeight = "90px";
  	this.categoryContainerTarget.innerHTML = "";
  	this.categoryContainerTarget.classList.remove('active');
  	this.letterContainerTarget.style.minHeight = "150px";
  	this.letterContainerTarget.innerHTML = "";
  	this.letterContainerTarget.classList.remove('animate__bounce');
  	const roulette = setInterval(() => {
  		this.randomLetter();
  	}, 100)
  	await setTimeout(() => {
  		clearInterval(roulette);
  		this.randomLetter();
  		this.letterContainerTarget.classList.add('animate__bounce');
  		setTimeout(() => {
  			this.randomCategory();
  		}, 1000)
  	}, 2000);
  }
}
