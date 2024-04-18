import type Artplayer from 'artplayer'
import '@/style/artplayerPlayListPlugin.css'

interface ListItem<T> {
  title: string
  url: string
  data?: T
}

interface Option<T> {
  playList: ListItem<T>[]
  index: number
  autoSwitch?: boolean
  onClick?: (index: number, url: string, data?: T) => void
  onSwitch?: (url: string, index: number) => void
}

export interface ArtplayerPlaylistPlugin<T> {
  show: () => void
  hide: () => void
  toggle: () => void
  select: (index: number) => void
  update: (option: Option<T>) => void
  name: string
}

function generateItemListHtml<T>(option: Option<T>): string {
  const itemsHtml = option.playList.map((item, index) => {
    return `<li class="artplayer-plugin-playlist-item" data-url="${item.url}" data-index="${index}" ${index === option.index ? 'selected' : ''}>${item.title}</li>`
  }).join('')
  return `<ul class="artplayer-plugin-playlist-list">${itemsHtml}</ul>`
}
function artplayerPlaylistPlugin<T = any>(option: Option<T>): (this: Artplayer, art: Artplayer) => ArtplayerPlaylistPlugin<T> {
  return function (artPlayer) {
    artPlayer.layers.add({
      name: 'playlist',
      html: `<div class="artplayer-plugin-playlist-layer">${generateItemListHtml(option)}</div>`,
      style: {
        position: 'absolute',
        right: '8px',
        bottom: '60px',
        width: '120px',
        height: '70%',
        display: 'none',
        background: 'rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        borderRadius: '4px',
      },
      mounted(element) {
        const list = element.querySelector('.artplayer-plugin-playlist-list') as HTMLElement
        list.addEventListener('click', (event) => {
          const target = event.target as HTMLElement
          if (target.classList.contains('artplayer-plugin-playlist-item')) {
            const selectedIndex = target.dataset.index ? +target.dataset.index : 0
            if (selectedIndex === option.index) {
              return
            }
            option.onClick?.(selectedIndex, option.playList[selectedIndex].url, option.playList[selectedIndex].data)
            if (option.autoSwitch) {
              const items = artPlayer.layers.playlist.querySelectorAll('.artplayer-plugin-playlist-item') as NodeListOf<HTMLElement>
              items[option.index].removeAttribute('selected')
              items[selectedIndex].setAttribute('selected', '')
              option.index = selectedIndex
              artPlayer.switchUrl(option.playList[selectedIndex].url).then(() => {
                option.onSwitch?.(option.playList[selectedIndex].url, option.index)
              })
            }
          }
        })
      },
    })
    function show() {
      artPlayer.layers.playlist.style.display = 'block'
      artPlayer.layers.playlist.querySelector('.artplayer-plugin-playlist-item[selected]')?.scrollIntoView()
    }
    function hide() {
      artPlayer.layers.playlist.style.display = 'none'
    }
    function isPlayListDisplay() {
      return artPlayer.layers.playlist.style.display === 'block'
    }
    function toggle() {
      if (isPlayListDisplay()) {
        hide()
      }
      else {
        show()
      }
    }
    function select(index: number) {
      if (option.index === index) {
        return
      }
      const items = artPlayer.layers.playlist.querySelectorAll('.artplayer-plugin-playlist-item') as NodeListOf<HTMLElement>
      items[option.index]?.removeAttribute('selected')
      items[index]?.setAttribute('selected', '')
      items[index]?.scrollIntoView()
      option.index = index
    }

    function update(newOption: Option<T>) {
      artPlayer.layers.update({
        name: 'playlist',
        html: `<div class="artplayer-plugin-playlist-layer">${generateItemListHtml(newOption)}</div>`,
      })
      Object.assign(option, newOption)
    }

    return {
      show,
      hide,
      toggle,
      select,
      update,
      name: 'playlist',
    }
  }
}

export default artplayerPlaylistPlugin
