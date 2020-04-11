class ApplicationController < ActionController::Base
  def current_user
    @current_user ||= begin
      (user_id = cookies.signed[:user_id]) ?
      Participant.includes(
        retrospective: [:participants, :zones, reflections: [:owner, :reactions]],
        reflections: [:zone, :owner, :reactions]
      ).find(user_id) :
      nil
    end
  end

  def ensure_logged_in
    return if current_user

    render json: { status: :unauthorized }
  end
end
