class Notice < ApplicationRecord
	include AASM

	#Metodo de paperclip para agregar los archivos de imagenes al modelo
	has_attached_file :cover, styles: { medium: "1280x720", thumb: "800x600" }
	#validación para que solo se permitan los archivos que nosotros queremos - la expresión regular es para permitir todo tipo de archivos de imagenes
	validates_attachment_content_type :cover, content_type: /\Aimage\/.*\Z/


	aasm column: "state" do
		state :in_draft, initial: true
		state :published

		event :publish do
			transitions from: :in_draft, to: :published
		end

		event :unpublish do
			transitions from: :published, to: :in_draft
		end
	end
end
