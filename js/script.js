(function(window) {
    /**
     * Objet global
     */
    let me = { };

    function getRandomIntInclusive(min, max, exclude) {
        let random;
        do {
            const minCeiled = Math.ceil(min);
            const maxFloored = Math.floor(max);
            random = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
        } while (random === exclude);
        return random;
    }

    /**
     * Animation du titre - Init
     */
    function init_titre() {
        me.anim_titre = {
            textes: [
                "Je me présente, Gaspard Fougerouse, développeur web.",
                "Je préfère le dev front !",
                "Je suis très motivé, si si je vous assure !!",
                "Ici c'est belles interfaces à gogo !!"
            ],
            vitesse: 80,
            container: document.getElementById('ecrit-dynamique'),
            index: 0,
            previousIndex: null
        };

        ecrire();
    }

    /**
     * Animation du titre - Effet d'écriture
     */
    function ecrire() {
        if (me.anim_titre.index === 0) {
            const newIndex = getRandomIntInclusive(0, me.anim_titre.textes.length - 1, me.anim_titre.previousIndex);
            me.anim_titre.texte = me.anim_titre.textes[newIndex];
            me.anim_titre.previousIndex = newIndex;
        }

        if (me.anim_titre.index < me.anim_titre.texte.length) {
            // Ajouter un caractère à la fois avec une vitesse aléatoire
            me.anim_titre.container.innerHTML += me.anim_titre.texte.charAt(me.anim_titre.index);
            me.anim_titre.index++;
            setTimeout(ecrire, me.anim_titre.vitesse * Math.random());
        } else {
            // Effacer au bout d'une seconde
            setTimeout(effacer, 1000);
        }
    }

    /**
     * Animation du titre - Effacement du texte
     */
    function effacer() {
        const longueurTexte = me.anim_titre.container.innerHTML.length;
        if (longueurTexte > 0) {
            // Effacer un caractère à la fois
            me.anim_titre.container.innerHTML = me.anim_titre.texte.substring(0, longueurTexte - 1);
            setTimeout(effacer, me.anim_titre.vitesse * Math.random());
        } else {
            // Après avoir tout effacé, recommence l'écriture
            me.anim_titre.index = 0;
            ecrire();
        }
    }

    /**
     * Animation des vidéos - Init
     */
    function init_video() {
        const video = document.getElementById('video-fond');
        
        video.addEventListener('mouseenter', function(event) {
            load_video('mer');
        });

        video.addEventListener('mouseleave', function(event) {
            load_video('vague');
        });
    }

    /**
     * Animation des vidéos - Changer la vidéo d'arrière-plan
     */
    function load_video(name) {
        const video = document.getElementById('video-fond');
        const source = video.getElementsByTagName('source')[0];
        source.src = './assets/vid/' + name + '.mp4';
        video.load();
    }

    /**
     * Animation par section quand on scroll
     */
    function init_scroll() {
        const sections = document.querySelectorAll('section');
    
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
    
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    /**
     * Attendre que la page soit chargée
     */
    window.onload = function(event) {
        init_titre();
        init_video();
        init_scroll();

        document.querySelectorAll('.carte').forEach(carte => {
            carte.addEventListener('click', function() {
                carte.classList.toggle('flip');
            });
        });
    };

})(window);
