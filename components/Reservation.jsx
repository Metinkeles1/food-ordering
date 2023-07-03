import Input from './form/Input'
import Title from './ui/Title'

const Reservation = () => {
    const inputs = [
        {
            id:1,
            name:"fullName",
            type: "text",
            placeholder: "Your Full Name"
        },
        {
            id: 2,
            name: "phoneNumber",
            type: "number",
            placeholder: "Your Phone Number"
        },
        {
            id: 3,
            name: "email",
            type: "email",
            placeholder: "Your Email Address"
        },
        {
            id: 4,
            name: "persons",
            type: "number",
            placeholder: "How Many Persons?"
        },
        {
            id: 5,
            name: "date",
            type: "datetime-local",
            placeholder: "Date "
        }
    ]

  return (
    <div className='container mx-auto py-12'>
        <Title addClass="text-[40px] mb-10">Book A Table</Title>
        <div className="flex justify-between flex-wrap-reverse gap-x-10">
            <div className='lg:flex-1 w-full'>
                <div className='flex flex-col gap-y-3'>
                    {inputs.map((input) => (
                        <Input key={input.id} {...input} />
                    ))}
                </div>
                <button className="btn-primary my-4">Book Now</button>
            </div>
            <div className='lg:flex-1 w-full'>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d3006.4228552601785!2d29.0255963!3d41.1034552!3m2!1i1024!2i768!4f13.1!5e0!3m2!1str!2str!4v1688370369127!5m2!1str!2str"                   
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps"
                    className='w-full h-full'
                ></iframe>
            </div>
        </div>
    </div>
  )
}

export default Reservation