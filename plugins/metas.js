const getGuildHead = (guild) => {
    return {
        title: guild.name,
        meta: [
          { hid: "description", name: "description", content: guild.description },
          {
            hid: "og:url",
            property: "og:url",
            content: "https://dissoku.net/server/" + guild.id,
          },
          { hid: "og:title", property: "og:title", content: guild.name },
          { hid: "og:type", property: "og:type", content: "website" },
          {
            hid: "og:description",
            property: "og:description",
            content: guild.description,
          },
          {
            hid: "og:image",
            property: "og:image",
            content: guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.jpg?size=256` : "https://dissoku.net/favicon.ico",
          },
          {
            hid: "twitter:card",
            name: "twitter:card",
            content: "summary_large_image",
          },
          {
            hid: "og:site_name",
            property: "og:site_name",
            content: "ディスコード速報",
          },
          { hid: "og:locale", property: "og:locale", content: "ja_JP" },
        ],
      }
}

const getGuildBread = (guild) => {
    return [
        {
          name: "ディス速",
          path: "/",
        },
        {
          name: "サーバー一覧",
          path: "/servers?page=1",
        },
        {
          name: guild.name,
        }
      ]
}

export default (context, inject) => {
    inject('getGuildHead', getGuildHead)
    inject('getGuildBread', getGuildBread)
}
