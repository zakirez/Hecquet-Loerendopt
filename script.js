const menu=document.querySelector('.burger'),nav=document.querySelector('.nav');if(menu)menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.09});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));const form=document.querySelector('#contact-form');if(form)form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const subject=encodeURIComponent('Demande depuis le site – '+data.get('service'));const body=encodeURIComponent('Nom : '+data.get('name')+'\nTéléphone : '+data.get('phone')+'\nEmail : '+data.get('email')+'\nService : '+data.get('service')+'\n\n'+data.get('message'));window.location.href='mailto:hecquetloerendopt@gmail.com?subject='+subject+'&body='+body;});

/* Animation machine à écrire en boucle pour le titre principal de chaque page. */
(function () {
  const heading = document.querySelector('.hero h1');
  if (!heading || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Ne modifier que le texte principal : le sous-titre <em> reste fixe.
  const textNode = Array.from(heading.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
  if (!textNode) return;
  const phrase = textNode.textContent.trim();
  const letters = Array.from(phrase);
  const line = document.createElement('span');
  line.className = 'typing-line';
  const reserve = document.createElement('span');
  reserve.className = 'typing-reserve';
  reserve.setAttribute('aria-hidden', 'true');
  reserve.textContent = phrase;
  const output = document.createElement('span');
  output.className = 'typing-output';
  output.setAttribute('aria-hidden', 'true');
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.textContent = '|';
  line.append(reserve, output);
  output.append(cursor);
  heading.replaceChild(line, textNode);
  heading.setAttribute('aria-label', phrase + (heading.querySelector('em') ? ' — ' + heading.querySelector('em').textContent.trim() : ''));
  heading.querySelectorAll('em').forEach(em => em.setAttribute('aria-hidden', 'true'));

  let index = 0;
  let deleting = false;
  const typeDelay = 80;
  const eraseDelay = 42;
  const fullPause = 2200;
  const emptyPause = 650;

  function tick() {
    if (deleting) index = Math.max(0, index - 1);
    else index = Math.min(letters.length, index + 1);

    output.replaceChildren(document.createTextNode(letters.slice(0, index).join('')), cursor);

    let delay = deleting ? eraseDelay : typeDelay;
    if (!deleting && index === letters.length) {
      deleting = true;
      delay = fullPause;
    } else if (deleting && index === 0) {
      deleting = false;
      delay = emptyPause;
    }
    window.setTimeout(tick, delay);
  }
  window.setTimeout(tick, 650);
})();
