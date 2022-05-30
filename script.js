window.onload = (event) => {
    const customselects = document.querySelectorAll('customselect');
    const fieldHeight = getComputedStyle(document.documentElement).getPropertyValue('--field-height'); 

    for(let i = 0; i < customselects.length; i++) {
        const customselect = customselects[i];
        if(!customselect.childElementCount) continue;
        const selectedOptions = customselect.querySelectorAll('[selected]');

        const hiddenInput = customselect.querySelector('input[type="hidden"]');
        if(selectedOptions.length > 1) {
            for(let a = 1; a < selectedOptions.length; a++)
                selectedOptions[a].removeAttribute('selected');
            hiddenInput.value = selectedOptions[0].value;
        }
        else if(selectedOptions.length == 1)
            hiddenInput.value = selectedOptions[0].value;
        else {
            hiddenInput.value = customselect.firstElementChild.value;
            customselect.firstElementChild.setAttribute('selected', '');
        }
        customselect.prepend(hiddenInput);
        customselect.style.height = `${fieldHeight}px`;
        customselect.addEventListener('click', (e) => {
            if(e.currentTarget.hasAttribute('data-open')) {
                e.currentTarget.removeAttribute('data-open');
                e.currentTarget.style.height = `${fieldHeight}px`;

                const target = e.target.tagName == 'option' ? e.target : e.target.closest('option');
                e.currentTarget.querySelector('[selected]').removeAttribute('selected');
                target.setAttribute('selected', '');
                e.currentTarget.querySelector('input[type="hidden"]').value = target.value;
            }
            else {
                let openHeight = (customselect.childElementCount-1) * fieldHeight;
                if(openHeight > 300)    openHeight = 300;
                e.currentTarget.setAttribute('data-open', '');
                customselect.style = `height: ${openHeight}px; transition: all 400ms ease-in-out 0s;`;

                setTimeout(() => {
                    customselect.style.transition = `none`;
                }, 400);
            }
        });
    }

    window.onclick = (e) => {
        const target = e.target.tagName == 'customselect' ? e.target : e.target.closest('customselect');
        document.querySelectorAll('customselect').forEach(el => {
            if(target != el) {
                el.removeAttribute('data-open');
                el.style.height = `${fieldHeight}px`;
            }
        });
    };
};