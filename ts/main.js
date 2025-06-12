var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
document.addEventListener("DOMContentLoaded", function () {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
        .then(function (response) { return response.json(); })
        .then(function (posts) {
        var cards = posts
            .map(function (post, index) {
            var _a;
            return (_a = {},
                _a["card-".concat(index + 1)] = {
                    title: post.title,
                    description: post.body,
                    image: "img/134006.png"
                },
                _a);
        })
            .reduce(function (acc, card) { return (__assign(__assign({}, acc), card)); }, {});
        function createCardTemplate(_a) {
            var title = _a.title, description = _a.description, image = _a.image;
            return "\n                    <div class=\"card\">\n                        <h3 class=\"card-title\">".concat(title, "</h3>\n                        <p class=\"card-description\">").concat(description, "</p>\n                        <img src=\"").concat(image, "\" alt=\"").concat(title, "\" class=\"card-image\">\n                    </div>\n                ");
        }
        function displayCard(cardData) {
            var cardDisplay = document.querySelector('.card-display');
            if (!cardDisplay) {
                console.error('Card display container not found.');
                return;
            }
            cardDisplay.innerHTML = createCardTemplate(cardData);
        }
        function handleFeatureClicks() {
            var features = document.querySelectorAll('.feature');
            if (features.length === 0) {
                console.error('No features found.');
                return;
            }
            features.forEach(function (f) { return f.classList.remove('active'); });
            features[0].classList.add('active');
            displayCard(cards['card-1']);
            features.forEach(function (feature, index) {
                feature.addEventListener('click', function () {
                    features.forEach(function (f) { return f.classList.remove('active'); });
                    feature.classList.add('active');
                    var cardKey = "card-".concat(index + 1);
                    if (cards[cardKey]) {
                        displayCard(cards[cardKey]);
                    }
                    else {
                        console.error("Card with key ".concat(cardKey, " not found."));
                    }
                });
            });
        }
        handleFeatureClicks();
    })
        .catch(function (error) {
        console.error('Error fetching data:', error);
    });
});
