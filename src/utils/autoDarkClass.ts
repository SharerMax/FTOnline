const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
if (darkMediaQuery.matches) {
  document.body.classList.add('dark')
}
else {
  document.body.classList.remove('dark')
}
darkMediaQuery.addEventListener('change', (_) => {
  document.body.classList.toggle('dark')
})
