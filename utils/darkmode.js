export const checkDark = () => {
    
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
           return document.documentElement.classList.add('dark')
           
          } else {
            return document.documentElement.classList.remove('dark')
          }

}


