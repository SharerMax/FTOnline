import type Artplayer from 'artplayer'
import '@/style/artplayerPlayListPlugin.css'

interface ListItem {
  title: string
  url: string
}

interface Option {
  playList: ListItem[]
  index: number
  onSelect?: (index: number) => void
  onSwitch?: (url: string, index: number) => void
}

export interface ArtplayerPlaylistPlugin {
  show: () => void
  hide: () => void
  toggle: () => void
  select: (index: number) => void
  update: (option: Option) => void

  name: string
}

function generateItemListHtml(option: Option): string {
  const itemsHtml = option.playList.map((item, index) => {
    return `<li class="artplayer-plugin-playlist-item" data-url="${item.url}" data-index="${index}" ${index === option.index ? 'selected' : ''}>${item.title}</li>`
  }).join('')
  return `<ul class="artplayer-plugin-playlist-list">${itemsHtml}</ul>`
}
function artplayerPlaylistPlugin(option: Option): (this: Artplayer, art: Artplayer) => ArtplayerPlaylistPlugin {
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
            const items = artPlayer.layers.playlist.querySelectorAll('.artplayer-plugin-playlist-item') as NodeListOf<HTMLElement>
            items[option.index].removeAttribute('selected')
            items[selectedIndex].setAttribute('selected', '')
            option.index = selectedIndex
            option.onSelect?.(option.index)
            artPlayer.switchUrl(option.playList[selectedIndex].url).then(() => {
              option.onSwitch?.(option.playList[selectedIndex].url, option.index)
            })
          }
        })
      },
    })
    function show() {
      artPlayer.layers.playlist.style.display = 'block'
    }
    function hide() {
      artPlayer.layers.playlist.style.display = 'none'
    }
    function toggle() {
      artPlayer.layers.playlist.style.display = artPlayer.layers.playlist.style.display === 'none' ? 'block' : 'none'
    }
    function select(index: number) {
      if (option.index === index) {
        return
      }
      const items = artPlayer.layers.playlist.querySelectorAll('.artplayer-plugin-playlist-item') as NodeListOf<HTMLElement>
      items[option.index]?.removeAttribute('selected')
      items[index]?.setAttribute('selected', '')
      option.index = index
    }

    function update(newOption: Option) {
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
