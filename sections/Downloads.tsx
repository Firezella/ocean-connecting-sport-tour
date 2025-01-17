import Button from "@/Components/Button"
import Tag from "@/Components/Tag"
import CardDownloadButtonImage from "@/Components/CardDownloadButtonImage"
import { useTranslations } from "next-intl"
import DownloadCard from "@/Components/DownloadCard"


function Downloads() {

  const t = useTranslations("homepage.downloads")

  return (
    <section className="flex justify-center">
      <div className="flex flex-col h-fit py-16 w-full justify-center container items-center">
        <Tag>{t("title")}</Tag>
        <div className="mt-5 flex justify-center w-full flex-col gap-5 items-center">
          <p className="px-3 leading-7 text-center text-pretty">
          {t("descr")}
          </p>
          <div className="flex px-3 flex-col lg:flex-row w-full justify-center items-center gap-10">
            <DownloadCard title={t("text_1")} description="" fileSize="249 kb" downloadUrl="https://www.upload.ee/files/17639571/7days_planning_watermark.pdf.html"/>
            <DownloadCard title={t("text_2")} description="" fileSize="242 kb" downloadUrl="https://www.upload.ee/files/17639581/10days_planning_watermark.pdf.html"/>
        </div>
        </div>
      </div>
    </section>
  )
}

export default Downloads